let Tables = require('../model/tables');
let {_pick} = require('../helper');

 async function saveTable(ctx,next) {
  
    let entity=ctx.request.body;
     ctx.type='application/json';
     if(entity._id){
         entity.updateAt=new Date().getTime();
        let body=await new Promise((resolve, reject) => {
            Tables.updateOne({
                _id: ctx.request.body._id
            },{
                $set: _pick(entity, ['code', 'totalSlots', 'takenSlots', 'updateAt'])
            }).then(result => {
                Tables.findById(entity._id, function (err, data) {
                    if (err) {
                        let strBody=JSON.stringify( {success: false, data: null, err: "TABLE_CAN_NOT_FIND", message: err.toString()});
                        resolve(strBody);
                    }else{
                        let strBody=JSON.stringify({success: true, data: data, err: null, message: null});
                        resolve(strBody);
                    }
                  });
        
             
            }).catch(err => {
                let strBody=JSON.stringify( {success: false, data: null, err: "TABLE_CAN_NOT_UPDATE", message: err.toString()});
                resolve(strBody);
            });
       });
       ctx.body = body;
     }else{
        entity.updateAt=new Date().getTime();
        entity.createAt=new Date().getTime();
        let body=await new Promise((resolve, reject) => {
            Tables.find({"code":entity.code}, function (err, data) {
                if (err) {
                    let strBody=JSON.stringify( {success: false, data: null, err: "TABLE_CAN_NOT_FIND", message: err.toString()});
                    resolve(strBody);
                }else{
                    if(data.length==0){
                        Tables.create({
                            ...entity
                        }, function(err, result) {
                            if(err) {
                                console.log(err);
                                let data= {success: false, data: null, err: "TABLE_CAN_NOT_CREATE", message: err.toString()};
                                let body=JSON.stringify(data);
                                resolve(body);
                            }
                            else {
                                console.log(result);
                                let data= {success: true, data: result, err: null, message: null}; 
                                let body=JSON.stringify(data);
                                resolve(body);
                            }
                        })
                    }else{
                        let data= {success: false, data: null, err: "TABLE_IS_EXIST", message: "the code of table is exits"}; 
                        let body=JSON.stringify(data);
                        resolve(body);
                    }
                }
              });

       });
       ctx.body = body;
     }
}

/**
 * deleteTable delete one table
 * @param {*} ctx 
 */
async function deleteTable(ctx) {
    let entity=ctx.request.body;
    ctx.type='application/json';
    if(entity._id){
       let body=await new Promise((resolve, reject) => {
            Tables.deleteOne({
                _id: entity._id
            }).then(result => {
                let data= {success: true, data: result, err: null, message: null}; 
                let body=JSON.stringify(data);
                resolve(body);
            }).catch(err => {
                console.log(err);
                let data= {success: false, data: null, err: "TABLE_CAN_NOT_DELETE", message: err.toString()};
                let body=JSON.stringify(data);
                resolve(body);
            });
      });
      ctx.body = body;
    }else{
        let body=JSON.stringify( {success: false, data: null, err: 'TABLE_IS_NOT_EXIST', message: 'this table is not exist'});
        ctx.body = body;
    }
}

/**
 * list
 * @param {*} ctx 
 */
async function list(ctx) {
    ctx.type='application/json';
    let body=await new Promise((resolve, reject) => {
            Tables.find()
            .then(result => {
                let data= {success: true, data: result, err: null, message: null}; 
                let body=JSON.stringify(data);
                resolve(body);
            }).catch(err => {
                console.log(err);
                let data= {success: false, data: null, err: "ABLE_CAN_NOT_FIND", message: err.toString()};
                let body=JSON.stringify(data);
                resolve(body);
            });
      });
      ctx.body = body;

}



module.exports = {
    saveTable,deleteTable,list
}