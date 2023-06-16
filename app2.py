import json

from flask import *
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
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

    def __repr__(self):
        return '%r,%r,%r' % (self.username, self.password, self.role)


# 连接数据库
try:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost/phone'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    print("数据库连接成功")
except:
    print("数据库连接失败")
finally:
    db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/')
def main():
    return redirect('/phone_info')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login1.html.bak')
    if request.method == 'POST':
        return redirect('/phone_info')


@app.route("/phone_info", methods=['GET', 'POST'])
def phone_info():
    return render_template('phone_info.html')


@app.route("/add_phone")
def add_phone():
    if 'role' in session and session['role'] == 'admin':
        return render_template('add_phone.html')
    else:
        return '您没有权限执行此操作'


@app.route("/delete_phone", methods=["POST"])
def delete_phone():
    if 'role' in session and session['role'] == 'admin':
        id = request.form["id"]
        phone = Phone.query.filter_by(id=id).first()
        db.session.delete(phone)
        db.session.commit()
        return "success"
    else:
        return '您没有权限执行此操作'


@app.route("/saverecord", methods=["POST", "GET"])
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
        return render_template("success_record.html", msg=msg)


@app.route("/update_phone", methods=["POST"])
def update_phone():
    id = request.form["id"]
    phone = Phone.query.filter_by(id=id).first()
    print(phone)
    phonebrand = request.form["phonebrand"]
    phonetype = request.form["phonetype"]
    cpuinfo = request.form["cpuinfo"]
    ramandrominfo = request.form["ramandrominfo"]

    # 更新数据库中的数据
    print(phone)
    phone.phonebrand = phonebrand
    print(phonebrand)
    phone.phonetype = phonetype
    print(phonetype)
    phone.cpuinfo = cpuinfo
    print(cpuinfo)
    phone.ramandrominfo = ramandrominfo
    print(ramandrominfo)
    db.session.commit()

    return "success"


if __name__ == "__main__":
    app.run(debug=True)
    app.config['SECRET_KEY'] = 'SDN32NLFDO3JDFJD'
    app.config['SESSION_TYPE'] = 'filesystem'
