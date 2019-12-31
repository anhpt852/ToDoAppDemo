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
    primaryKey: 'uid',
    properties: {
        uid:  'string',
        title: 'string',
        content: 'string',
        priority:'string?',
        datetime:'int',
        status: {type: 'bool', default: false }
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
        console.log(data);
        
        realm.write(() => {
            data.forEach(element => {
                realm.create('ToDo', {    
                    uid:  element.uid ? element.uid.toString() : '',
                    title: element.title ? element.title.toString() : '',
                    content: element.content ? element.content.toString() : '',
                    priority: element.priority ?  JSON.stringify(element.priority) : '',
                    status: element.status ?  element.status : false,
                    datetime: element.datetime ? moment(element.datetime).valueOf(): 0, // dùng để sắp xếp các bản ghi theo thời gian
                },true);
            })
            callback(true,Array.from(realm.objects('ToDo').sorted('datetime', false)))
        });
    })
    .catch(error => {
        callback(false,_.toString(error))
    });
};

// Cập nhật thông tin chi tiết ghi chú
export const updateToDo = (data, callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        realm.write(() => {
            console.log('aaa',moment(data.datetime).valueOf());
            
            if(data){
                realm.create('ToDo', {
                    uid:  data.uid ? data.uid.toString() : '', 
                    title: data.title ? data.title.toString() : '',
                    content: data.content ? data.content.toString() : '',
                    priority: data.priority ? JSON.stringify(data.priority) : '',
                    status: data.status ?  data.status : '',
                    datetime: data.datetime ? moment(data.datetime).valueOf(): 0,
                }, true);
                callback(true,Array.from(realm.objects('ToDo').sorted('datetime', false)))
            } else {
                callback(false,'Dữ liệu lưu không hợp lệ');
            }      
        })
    }).catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Xoá ghi chú
export const removeToDo = (uid, callback) => {
    Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('ToDo', uid.toString()));

            callback(true,Array.from(realm.objects('ToDo').sorted('datetime', false)))
        })
    })
    .catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Xoá tất cả ghi chú đã lưu

// export const removeAllToDo = (callback) => {
// 	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
//     .then(realm => {
//         realm.write(() => {
//             let allToDos = realm.objects('ToDo');
//             realm.delete(allToDos);
//             callback(true);
//         }).catch(error => {
//             callback(false)
//         });
//     })
//     .catch(error => {
//         callback(false,(_.toString(error)));
//     });
// };

// Lấy tất cả ghi chú
export const getAllToDo = (callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        let allToDos = Array.from(realm.objects('ToDo').sorted('datetime', false));
        callback(true,allToDos);
    })
    .catch(error => {
        callback(false,(_.toString(error)));
    });
};

// Lấy thông tin vi phạm bằng id
export const getToDoById = (uid, callback) => {
	Realm.open({schema: [ToDoSchema],encryptionKey: toByteArray(Config.DatabaseKey)})
    .then(realm => {
        const todo = realm.objects('ToDo').filtered('uid == $0', uid.toString());
        callback(true,todo[0]);
    })
    .catch(error => {
        callback(false,_.toString(error));
    });
};

