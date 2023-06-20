import json

from flask import *
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'fjlsdfjkk23'
db = SQLAlchemy()

'''定义Phone模型用户添加删除'''


class Phone(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    phonebrand = db.Column(db.String(10))
    phonetype = db.Column(db.String(100), nullable=False)
    cpuinfo = db.Column(db.String(20), nullable=False)
    ramandrominfo = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '%r,%r,%r,%r,%r' % (self.id, self.phonebrand, self.phonetype, self.cpuinfo, self.ramandrominfo)


'''定义User模型用于权限管理'''


class User(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(120))
    role = db.Column(db.String(80))

    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role


# 连接数据库
try:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost/phone'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
except:
    print("数据库连接失败")
finally:
    db.init_app(app)

with app.app_context():
    db.create_all()
    print("数据库连接成功")


@app.route('/')
def helloworld():
    return redirect(url_for('index'))


@app.route('/index')
def index():
    if 'role' in session:
        return redirect(url_for('phone_info'))
    else:
        return render_template('login.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.form
    username = data['username']
    password = data['password']
    print(f"从前端获取到的账号密码为: 用户名={username}, 密码={password}")
    user = User.query.filter_by(username=username).first()
    print(user)
    if user:
        print(f"数据库中查询到的用户名和密码为: 用户名={username}, 密码={user.password}")
        print(str(user.password), str(password))
        if str(user.password) == str(password):
            print("账号密码正确")
            session['role'] = user.role
            print(f"已设置权限组为{user.role}")
            print("登录成功")
            return jsonify({"code": 0, 'success': True, "msg": "登录成功"})
        else:
            print("密码错误")
            return jsonify({"code": 1, 'success': False, "msg": "密码错误"})
    else:
        print("用户不存在")
        return jsonify({"code": 2, 'success': False, "msg": "用户不存在"})


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route("/add_phone")
def add_phone():
    if 'role' in session and session['role'] == 'admin':
        return render_template('add_phone.html')
    else:
        return '您没有权限执行此操作'


@app.route("/delete_phone", methods=["POST"])
def delete_phone():
    deldata = request.form
    print(deldata)
    if 'role' in session and session['role'] == 'admin':
        id = request.form["id"]
        phone = Phone.query.filter_by(id=id).first()
        print(phone)
        print("删除了一条记录")
        db.session.delete(phone)
        db.session.commit()
        return "success"
    else:
        return '您没有权限执行此操作'


@app.route("/saverecord", methods=["POST"])
def saveRecord():
    msg = "saved"
    if request.method == "POST":
        phonebrand = request.form["phonebrand"]
        phonetype = request.form["phonetype"]
        cpuinfo = request.form["cpuinfo"]
        ramandrominfo = request.form["ramandrominfo"]

        # 添加上述信息
        phone = Phone(phonebrand=phonebrand, phonetype=phonetype, cpuinfo=cpuinfo, ramandrominfo=ramandrominfo)
        print(phone)  # 创建一个Add对象
        db.session.add(phone)
        db.session.commit()
        return "success"


@app.route("/phone_info")
def phone_info():
    phones = str(Phone.query.all())
    phones = str(phones.strip('[]').replace("'", ""))
    result = []
    print("原始数据：" + phones)
    phones = phones.split(", ")
    for phone in phones:
        parts = phone.split(',')
        result.append({
            "id": parts[0],
            "phonebrand": parts[1],
            "phonetype": parts[2],
            "cpuinfo": parts[3],
            "ramandrominfo": parts[4]

        })
    phones_json = json.dumps(result, ensure_ascii=False, sort_keys=False, indent=4, separators=(',', ':')).strip('[]')
    print("json数据" + phones_json)
    return render_template('phone_view.html', phones_json=phones_json)


@app.route("/get_phone", methods=["POST"])
def get_phone():
    id = request.form["id"]
    phone = Phone.query.filter_by(id=id).first()
    phone_data = {
        "id": phone.id,
        "phonebrand": phone.phonebrand,
        "phonetype": phone.phonetype,
        "cpuinfo": phone.cpuinfo,
        "ramandrominfo": phone.ramandrominfo
    }
    return jsonify(phone_data)


@app.route("/modify_phone")
def update_phone():
    return render_template("modify_phone.html", id=id)


@app.route("/modify", methods=["POST"])
def modify():
    id = request.form["id"]
    phone = Phone.query.filter_by(id=id).first()
    phone.phonebrand = request.form["phonebrand"]
    phone.phonetype = request.form["phonetype"]
    phone.cpuinfo = request.form["cpuinfo"]
    phone.ramandrominfo = request.form["ramandrominfo"]
    db.session.commit()
    return "success"


if __name__ == "__main__":
    app.run(debug=True)
