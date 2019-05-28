let Booking = require('../model/booking');
let {_pick} = require('../helper');
/**
 * saveBooking help create or update booking
 * @param {*} ctx 
 */
async function saveBooking(ctx) {
     let entity=ctx.request.body;
     ctx.type='application/json';
     if(entity._id){
         entity.updateAt=new Date().getTime();
        let body=await new Promise((resolve, reject) => {
            Booking.updateOne({
                _id: ctx.request.body._id
            },{
                $set: _pick(entity, ['tableCode', 'totalSlots', 'customerName', 'customerPhone','updateAt'])
            }).then(result => {
                Booking.findById(entity._id, function (err, data) {
                    if (err) {
                        let strBody=JSON.stringify( {success: false, data: null, err: "BOOKING_CAN_NOT_FIND", message: err.toString()});
                        resolve(strBody);
                    }else{
                        let strBody=JSON.stringify({success: true, data: data, err: null, message: null});
                        resolve(strBody);
                    }
                  });
        
             
            }).catch(err => {
                let strBody=JSON.stringify( {success: false, data: null, err: "BOOKING_CAN_NOT_UPDATE", message: err.toString()});
                resolve(strBody);
            });
       });
       ctx.body = body;
     }else{
        entity.updateAt=new Date().getTime();
        entity.createAt=new Date().getTime();
        let body=await new Promise((resolve, reject) => {
            Booking.create({
                ...entity
            }, function(err, result) {
                if(err) {
                    console.log(err);
                    let data= {success: false, data: null, err: "BOOKING_CAN_NOT_CREATE", message: err.toString()};
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
       });
       ctx.body = body;
     }
}

/**
 * deleteBooking delete one booking
 * @param {*} ctx 
 */
async function deleteBooking(ctx) {
    let entity=ctx.request.body;
    ctx.type='application/json';
    if(entity._id){
       let body=await new Promise((resolve, reject) => {
            Booking.deleteOne({
                _id: entity._id
            }).then(result => {
                let data= {success: true, data: result, err: null, message: null}; 
                let body=JSON.stringify(data);
                resolve(body);
            }).catch(err => {
                console.log(err);
                let data= {success: false, data: null, err: "BOOKING_CAN_NOT_DELETE", message: err.toString()};
                let body=JSON.stringify(data);
                resolve(body);
            });
      });
      ctx.body = body;
    }else{
        let body=JSON.stringify( {success: false, data: null, err: 'BOOKING_IS_NOT_EXIST', message: 'this booking is not exist'});
        ctx.body = body;
    }
}

/**
 * listBookingByCustomer
 * @param {*} ctx 
 */
async function listBookingByCustomer(ctx) {
    let entity=ctx.request.body;
    ctx.type='application/json';
    if(entity.customerPhone ){
        let queryJSON = {customerPhone:entity.customerPhone};
        let body=await new Promise((resolve, reject) => {
            Booking.find(queryJSON)
            .then(result => {
                let data= {success: true, data: result, err: null, message: null}; 
                let body=JSON.stringify(data);
                resolve(body);
            }).catch(err => {
                console.log(err);
                let data= {success: false, data: null, err: "BOOKING_CAN_NOT_FIND", message: err.toString()};
                let body=JSON.stringify(data);
                resolve(body);
            });
      });
      ctx.body = body;
    }else{
        let data= {success: false, data: null, err: "BOOKING_DONT_HAVE_CUTOMER_PHONE", message: 'Parameter customer phone isn\'t exist'};
        let body=JSON.stringify(data);
        ctx.body = body;
    }
}



module.exports = {
    saveBooking,deleteBooking,listBookingByCustomer
}