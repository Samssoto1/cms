var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/messages');
module.exports = router; 

router.get('/', (req, res, next) => {
    // call the Document model find() method to get all messages in the collection
    Message.find()
    // return response status 200 and a JSON object containing the list of messages
        .then(returnMessages => {
            res.status(200).json({returnMessages})
        })
        // if an error occurred
        //    return response status 500 and a JSON object containing information about the error
        .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
    });

    message.save()
        .then(createdMessage => {
        res.status(201).json({
            message: 'Message added successfully',
            createdMessage: createdMessage
        });
    })
        .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
    .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;

        Message.updateOne({ id: req.params.id }, message)
        .then(result => {
            res.status(204).json({
            message: 'Message updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
        });
    })
    .catch(error => {
        res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
    .then(msg => {
        Message.deleteOne({ id: req.params.id })
        .then(result => {
            res.status(204).json({
            message: "Message deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
        })
    })
    .catch(error => {
        res.status(500).json({
        message: 'Message not found.',
        error: { msg: 'Message not found'}
        });
    });
});