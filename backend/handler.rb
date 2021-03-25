require 'json'

def whoami(event:, context:)
	hash = {username: 'edn28'}
	{ statusCode: 200, body: JSON.generate(hash) }
end