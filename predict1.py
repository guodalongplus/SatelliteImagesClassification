import tensorflow as tf
import numpy as np
import cv2

image_size = 64
num_channels = 3

def predict1(path):
    images = []
    image = cv2.imread(path)

    image = cv2.resize(image, (image_size, image_size), 0, 0, cv2.INTER_LINEAR)
    images.append(image)
    images = np.array(images, dtype=np.uint8)
    images = images.astype('float32')
    images = np.multiply(images, 1.0 / 255.0)

    # tf要求输入是4维的：第一个参数是1因为每次预测的就是一张图  1 64 64 3
    x_batch = images.reshape(1, image_size, image_size, num_channels)

    # 开启一个对话
    sess = tf.Session()
    # 拿到刚才保存的模型：直接输文件名，要.meta结尾的
    saver = tf.train.import_meta_graph('model1/savemodel.ckpt-4998.meta')
    # 拿刚才保存模型的权重参数：直接输文件名，后缀最长的那个
    saver.restore(sess, './model1/savemodel.ckpt-4998')
    # 同样导入标签：1和0
    graph = tf.get_default_graph()

    y_pred = graph.get_tensor_by_name("y_pred:0")

    x = graph.get_tensor_by_name("x:0")
    y_true = graph.get_tensor_by_name("y_true:0")
    y_test_images = np.zeros((1, 3))

    # 两个值：谁的概率大就是谁
    feed_dict_testing = {x: x_batch, y_true: y_test_images}
    # 预测开始：
    result = sess.run(y_pred, feed_dict=feed_dict_testing)
    # 把1和0又回到其对应的种类
    res_label = ['下水井盖', '人行道', '草坪']
    print(res_label[result.argmax()])
    return res_label[result.argmax()]
