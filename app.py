from flask import Flask,render_template,request,redirect,url_for
import mysql.connector
app = Flask(__name__)
mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "@Khasim2004",
    database = 'resmanagement'
)
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/buy",methods = ['POST'])
def buy():
    product_name = request.form['product_name']
    price = request.form['price']
    cursor = mydb.cursor()
    sql = "INSERT INTO orders (product_name, price) VALUES (%s, %s)"
    cursor.execute(sql, (product_name, price))
    mydb.commit()
    cursor.close()
    return "Order placed"
@app.route("/menu.html")
def menu():
    return render_template("menu.html")
@app.route("/orders.html")
def orders():
    sql = "select *from orders"
    cursor = mydb.cursor()
    cursor.execute(sql)
    orders_data = cursor.fetchall()
    cursor.close()
    return render_template("orders.html",orders = orders_data )
@app.route("/login.html")
def login():
    return render_template("login.html")
@app.route('/login',methods = ['POST'])
def log():
    email = request.form['email']
    password = request.form['password']
    cursor = mydb.cursor()
    sql = 'select * from signup where email = %s AND password = %s'
    cursor.execute(sql,(email,password))
    user = cursor.fetchone()
    if user:
        return redirect(url_for('index'))
    else:
        print("Login failed! Invalid email or password.")
@app.route("/signup.html")
def signup():
    return render_template("/signup.html")
@app.route("/register",methods = ['POST'])
def register():
    first_name = request.form['firstName']
    last_name = request.form['lastName']
    email = request.form['email']
    phone = request.form['phone']
    password = request.form['password']
    confirm_password = request.form['confirmPassword']
    if password != confirm_password:
        return 'Password Entered is Invalid'
    cursor = mydb.cursor()
    sql = "insert into signup (first_name,last_name,email,phone,password,confirm_password) values(%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql,(first_name,last_name,email,phone,password,confirm_password))
    mydb.commit()
    return redirect(url_for('login'))
@app.route("/payments.html")
def payment():
    return render_template("/payments.html")
if __name__ == "__main__":
    app.run(debug = True)