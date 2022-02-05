 'use strict';

 const firebase = require('../db');
 const Item = require('../models/item');
 const firestore = firebase.firestore();
 const nodemailer = require('nodemailer');


 //email functionality

 let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ppranjal99@gmail.com',
        pass: 'pekceh-1gabCu-nucbej'
    }
});
  

 const addItem = async (req, res, next) => {
     try{
        const data = req.body;
        await firestore.collection('items').doc().set(data);
        res.send('Record saved successfully');
     }catch (error){
        res.status(400).send(error.message);
     }
 }

 const getAllItems = async (req, res, next) => {
     try{
        const items = await firestore.collection('items');
        const data = await items.get();
        const itemsArray = [];
        if(data.empty){
            res.status(404).send('No records found');
        } else {
            data.forEach(doc => {
                const item = new Item(
                    doc.id,
                    doc.data().title,
                    doc.data().description
                )
                itemsArray.push(item);
            });
            res.send(itemsArray);
        }
     }catch (error){
        res.status(400).send(error.message);
     }
 }

 const getItem = async (req, res, next) => {
     try{
        const id = req.params.id;
        const items = await firestore.collection('items').doc(id);
        const data = await items.get();
        if(!data.exists){
            res.status(404).send('Item with the given id does not exist');
        } else {
            const item = new Item(
                data.id,
                data.data().title,
                data.data().description
            );
            let mailDetails = {
                from: 'ppranjal99@gmail.com',
                to: 'pranjal@jobulary.io',
                subject: 'Test mail',
                text: item.title + 'is the title',
                html: item.title + 'is the title <button type="button">Approve</button>'
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
            res.send(data.data());
        }
     } catch(error){
         res.status(404).send(error.message);
     }
 }

 module.exports = {
     addItem,
     getAllItems,
     getItem
 }