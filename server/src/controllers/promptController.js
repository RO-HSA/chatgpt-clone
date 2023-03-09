const { Router } = require("express")
const InputPrompt = require("../models/input-model")
const openai = require("../config/openai")

module.exports = {
	async sendText(request, res){

		const openaiAPI = openai.configuration()
		const inputModel = new InputPrompt(request.body)

		try {
			const response = await openaiAPI.createCompletion(
				openai.textCompletion(inputModel)
			)

			return res.status(200).json({
				sucess: true,
				data: response.data.choices[0].text
			})

		} catch (error) {

			return res.status(400).json({
				sucess: false,
				error: error.response
				? error.response.data
				: 'Deu merda no servidor'
			})

		}
	}

}