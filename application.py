from flask import *
from flask_sqlalchemy import SQLAlchemy
import pymysql
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add_student")
def add_student():
    return render_template("add_phone.html")


@app.route("/saverecord", methods=["POST", "GET"])
def saveRecord():
    msg = "msg"
    if request.method == "POST":
        try:
            name = request.form["name"]
            email = request.form["email"]
            gender = request.form["gender"]
            contact = request.form["contact"]
            dob = request.form["dob"]
            address = request.form["address"]
            with sqlite3.connect("student_detials.db") as connection:
                cursor = connection.cursor()
                cursor.execute(
                    "INSERT into Student_Info (name, email, gender, contact, dob, address) values (?,?,?,?,?,?)",
                    (name, email, gender, contact, dob, address))
                connection.commit()
                msg = "学生信息添加成功"
        except:
            connection.rollback()
            msg = "不能把该学生信息添加到数据库"
        finally:
            return render_template("success_record.html", msg=msg)
            connection.close()


@app.route("/delete_student")
def delete_student():
    return render_template("delete_student.html")


@app.route("/phone_info")
def student_info():
    connection = sqlite3.connect("student_detials.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()
    cursor.execute("select * from Student_Info")
    rows = cursor.fetchall()
    return render_template("phone_info.html", rows=rows)


@app.route("/deleterecord", methods=["POST"])
def deleterecord():
    id = request.form["id"]
    with sqlite3.connect("student_detials.db") as connection:

        cursor = connection.cursor()
        cursor.execute("select * from Student_Info where id=?", (id,))
        rows = cursor.fetchall()
        if not rows == []:

            cursor.execute("delete from Student_Info where id = ?", (id,))
            msg = "学生信息成功删除"
            return render_template("delete_record.html", msg=msg)

        else:
            msg = "该信息不能被删除"
            return render_template("delete_record.html", msg=msg)


if __name__ == "__main__":
    app.run(debug=True)
