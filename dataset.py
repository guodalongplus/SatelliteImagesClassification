import cv2
import os
import glob
from sklearn.utils import shuffle
import numpy as np


# 图像预处理
def load_train(train_path, image_size, classes):
    # 保存所有读入图像的矩阵
    images = []
    # 总标签列表记录所有读入的，图像的标签
    labels = []
    img_names = []
    cls = []

    print('现在开始读取图像:')
    # 遍历类比：先读island的图像，再读seaice的图像
    for fields in classes:
        k = 1
        index = classes.index(fields)
        print('现在读取 {} 文件夹下图片 (索引号: {})'.format(fields, index))
        path = os.path.join(train_path, fields, '*g')  # 把文件夹下的所有图片的路径拿到
        files = glob.glob(path)  # 遍历每个图片
        # 高速路类、房屋的变量
        for fl in files:
            image = cv2.imread(fl)
            #  将图像大小转成64x64
            image = cv2.resize(image, (image_size, image_size), 0, 0, cv2.INTER_LINEAR)
            k = k + 1
            image = image.astype(np.float32)
            # 归一化：矩阵数值都转成0到1之间
            image = np.multiply(image, 1.0 / 255.0)
            # 加到总图像列表中
            images.append(image)
            # 每类图片有自己的label
            label = np.zeros(len(classes))
            # 例如：高速路时：label=[0,1,0,0]  房屋时：label=[0,0,1,0]
            label[index] = 1.0
            labels.append(label)
            flbase = os.path.basename(fl)
            img_names.append(flbase)
            cls.append(fields)

    # 把所有列表转换为一维数组/矩阵
    images = np.array(images)
    labels = np.array(labels)
    img_names = np.array(img_names)
    # 所有图片所属标签
    cls = np.array(cls)

    # 图片已拿到并预处理：把读入并加过标签的数据返回为辅助函数3
    return images, labels, img_names, cls


# 用DataSet类保存数据集的相关信息
class DataSet(object):

    def __init__(self, images, labels, img_names, cls):
        # 记录图像的数量
        self._num_examples = images.shape[0]
        self._images = images
        self._labels = labels
        self._img_names = img_names
        self._cls = cls
        self._epochs_done = 0
        self._index_in_epoch = 0

    @property  # .修饰方法，是方法可以像属性一样访问。
    def images(self):
        return self._images

    @property
    def labels(self):
        return self._labels

    @property
    def img_names(self):
        return self._img_names

    @property
    def cls(self):
        return self._cls

    @property
    def num_examples(self):
        return self._num_examples

    @property
    def epochs_done(self):
        return self._epochs_done

    # 被用
    def next_batch(self, batch_size):
        start = self._index_in_epoch
        self._index_in_epoch += batch_size

        if self._index_in_epoch > self._num_examples:
            # After each epoch we update this
            self._epochs_done += 1
            start = 0
            self._index_in_epoch = batch_size
            assert batch_size <= self._num_examples
        end = self._index_in_epoch

        return self._images[start:end], self._labels[start:end], self._img_names[start:end], self._cls[start:end]


# 打乱数据集并分为测试集和训练集
def read_train_sets(train_path, image_size, classes, validation_size):
    class DataSets(object):
        pass

    data_sets = DataSets()

    # 调用图像预处理函数
    images, labels, img_names, cls = load_train(train_path, image_size, classes)
    # 打乱数据集
    images, labels, img_names, cls = shuffle(images, labels, img_names, cls)

    # 设定测试集的样本数：(判断数据类型isinstance)
    if isinstance(validation_size, float):
        # 测试集个数 = 20% * 1400
        validation_size = int(validation_size * images.shape[0])

    # 测试集
    validation_images = images[:validation_size]
    validation_labels = labels[:validation_size]
    validation_img_names = img_names[:validation_size]
    validation_cls = cls[:validation_size]

    # 训练集
    train_images = images[validation_size:]
    train_labels = labels[validation_size:]
    train_img_names = img_names[validation_size:]
    train_cls = cls[validation_size:]

    # 调用函数2：
    data_sets.train = DataSet(train_images, train_labels, train_img_names, train_cls)
    data_sets.valid = DataSet(validation_images, validation_labels, validation_img_names, validation_cls)

    # 返回一个包含训练集和测试集相关信息的类
    return data_sets
