import os
# from app import app
from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename
from predict import predict
from predict1 import predict1

UPLOAD_FOLDER = os.getcwd() + '\\static\\uploads'
app = Flask(__name__)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def upload_form():
    return render_template('index.html')


@app.route('/upload1', methods=['POST'])
def upload_image1():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        pp = str(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        res = predict(pp)
        print("模型预测结果：" + res)
        return render_template('index.html', result_json=res, filename=filename)
    else:
        return redirect(request.url)


@app.route('/upload2', methods=['POST'])
def upload_image2():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        pp = str(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        res = predict1(pp)
        print("模型预测结果：" + res)
        return render_template('index.html', result_json1=res, filename1=filename)
    else:
        return redirect(request.url)


@app.route('/testOne/<filenameone>')
def display_image1(filenameone):
    print("2:" + url_for('static', filename='uploads/' + filenameone))
    return redirect(url_for('static', filename='uploads/' + filenameone))


@app.route('/display/<filename>')
def display_image(filename):
    print("1:" + url_for('static', filename='uploads/' + filename))
    return redirect(url_for('static', filename='uploads/' + filename))


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=7949)

