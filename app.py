from flask import Flask, render_template
import Data as oasis
app= Flask(__name__)


@app.route('/')
def connect():
    data=oasis.getData()
    return render_template('mainpage.html',data=data)

if __name__ == '__main__':
    app.run(debug=True)