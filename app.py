import json

from flask import *
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()


class Phone(db.Model):
    phonebrand = db.Column(db.String(10), nullable=False, primary_key=True)
    phonetype = db.Column(db.String(100), nullable=False)
    cpuinfo = db.Column(db.String(20), nullable=False)
    ramandrominfo = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '%r,%r,%r,%r' % (self.phonebrand, self.phonetype, self.cpuinfo, self.ramandrominfo)


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


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add_phone")
def add_student():
    return render_template("add_phone.html")


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
            "phonebrand": parts[0],
            "phonetype": parts[1],
            "cpuinfo": parts[2],
            "ramandrominfo": parts[3]

        })
    phones_json = json.dumps(result, ensure_ascii=False, sort_keys=False, indent=4, separators=(',', ':')).strip('[]')
    print("json数据" + phones_json)
    return render_template('phone_info.html', phones_json=phones_json)


if __name__ == "__main__":
    app.run(debug=True)
