const conversionService = require('../services/conversionService')

exports.registerConversion = async (req, res) => {
    const { cryptoName, amount } = req.body
    const userId = req.user.id
 
    try {
        const conversion = await conversionService.registerConversion(userId, cryptoName, amount)
        return res.status(201).json({ message: 'Consulta registrada', data: conversion })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.historyConversion = async (req, res) => {
    try {
        const history = await conversionService.historyConversion(req.user.id);
        return res.status(200).json({ message: 'Histórico de conversões: ', data: history })

    } catch (error) {
        if (error.message === 'Sem histórico até o momento') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao acessar histórico de conversões.' });
    }
}