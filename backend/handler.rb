require 'json'
require 'httparty'

$corsHeaders = {'Access-Control-Allow-Origin': '*'}

def whoami(event:, context:)
	hash = {username: 'edn28'}
	{ statusCode: 200, body: JSON.generate(hash) }
end

def recipes(event:, context:)
	response = nil

	puts "EVENT: "
	puts event["headers"]

	if event["headers"]["Authorization"]
		token = event["headers"]["Authorization"]
	else
		token = false
	end

	if(!token)
		response = {statusCode: 401, headers: $corsHeaders}
	else
		#verify in firebase
		begin
			verification = firebase_verification(token)
			if verification["users"][0]["localId"]
				# User has been verified
				hash = [{title: 'Foolproof pan pizza',description: 'Try this amazing pan pizza recipe!',voteTotal: 35},{title: 'Foolproof pan pizza #2',description: 'Try this second pan pizza recipe!',voteTotal: 50}]
				response = { statusCode: 200, body: JSON.generate(hash), headers: $corsHeaders }
			else
				response = {statusCode: 401, headers: $corsHeaders}
			end
		rescue
			response = {statusCode: 401, headers: $corsHeaders}
		end
	end

	response
	
end

def firebase_verification(token)
	url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyDbXZCw-a5eWxEm1RbJIg45vc45ALbzUVg"
	firebase_verification_call = HTTParty.post(url, headers: { 'Content-Type' => 'application/json' }, body: { 'idToken' => token }.to_json )
	if firebase_verification_call.response.code == "200"
		firebase_infos = firebase_verification_call.parsed_response
	else
		raise StandardError.new "Invalid token"
	end
end