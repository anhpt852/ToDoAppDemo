const Realm = require('realm');
import Config from './Config';
import moment from 'moment';
import _ from 'lodash';

const successObject={
    code: 0,
    message:'success'
}

const ToDoSchema = {
    name: 'ToDo',
    primaryKey: 'id',
    properties: {
        id:  'string',
        title: 'string',
        content: 'string',
        priority:'string?',
        datetime:'int',
    }
};


function toByteArray(str) {
	var array = new Int8Array(str.length);
	for (i = 0; i < str.length; i++) {
		array[i] = str.charCodeAt(i);
	}
	return array;
}

// Thêm ghi chú
export const addToDo = (data, callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        realm.write(() => {
            data.forEach(element => {
                realm.create('ToDo', {    
                    id:  element.id ? element.id.toString() : '',
                    title: element.title ? element.title.toString() : '',
                    content: element.content ? element.content.toString() : '',
                    priority: element.priority ? element.priority.toString() : '',
                    datetime: element.datetime ? moment(element.datetime).valueOf(): 0, // dùng để sắp xếp các bản ghi theo thời gian
                },true);
            })
            callback(true,realm.objects('ToDo').sorted('datetime', true))
        });
    })
    .catch(error => {
        callback(false,_.toString(error))
    });
};

// Cập nhật thông tin chi tiết ghi chú
export const updateToDo = (id, data, callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        realm.write(() => {

            if(chitiet){
                realm.create('ToDo', {
                    id:  id.toString() , 
                    title: data.title ? data.title.toString() : '',
                    content: data.content ? data.content.toString() : '',
                    priority: data.priority ? data.priority.toString() : '',
                    datetime: data.datetime ? moment(data.datetime).valueOf(): 0,
                }, true);
                callback(true,realm.objectForPrimaryKey('ToDo', id.toString()))
            } else {
                callback(false,'Dữ liệu lưu không hợp lệ');
            }      
        })
    }).catch(error => {
        callback(false,(_.toString(error)));
    }).catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Xoá ghi chú
export const removeToDo = (id, callback) => {
    Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('ToDo', id.toString()));
            callback(successObject);
        }).catch(error => {
            callback(false,(_.toString(error)))
        });
    })
    .catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Xoá tất cả ghi chú đã lưu

export const removeAllToDo = (callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        realm.write(() => {
            let allToDos = realm.objects('ToDo');
            realm.delete(allToDos);
            callback(true);
        }).catch(error => {
            callback(false)
        });
    })
    .catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Lấy tất cả ghi chú
export const getAllToDo = (callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        console.log('hereee');
        let allToDos = realm.objects('ToDo').sorted('thoigiantimestamp', true);
        callback(true,allToDos);
    })
    .catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Lấy thông tin vi phạm bằng id
export const getToDoById = (id, callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        
        
        const todo = realm.objects('ToDo').filtered('id == $0', id.toString());
        callback(true,todo[0]);
    })
    .catch(error => {
        callback(false,_.toString(error));
    });
};

