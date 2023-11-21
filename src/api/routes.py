"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import hashlib
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route("/signup",methods=["POST"])
def user_sign_up():
    new_user_data = request.get_json()
    # name = new_user_data["name"]
    email = new_user_data["email"]
    #makes it so that password is unique
    #hashlib is a function that returns an integer value,reads passwords with number
    #sha its encrypted &hex digest
    #the sha 256 is the salt to add
    hashed_password = hashlib.sha256(new_user_data ["password"].encode("utf-8") ).hexdigest() #figure out this line
    #adding a salt:
    hasemail = User.query.filter_by(email = email).first()
    if hasemail is None:
        new_user = User( email=email, password=hashed_password,is_active = True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify("User registered successfully"), 201
    else:
        return jsonify("user already exists")

@api.route("/get_user",methods=["GET"])
@jwt_required()
def get_user():
    id = get_jwt_identity()
    user = User.query.filter_by(id = id).first()
    if user is not None:
        return jsonify(user.serialize()),200
    else:
        return("no user found")
@api.route("/login",methods=["POST"])
# learn php larval through on sale udemy
def login():
    new_user_data = request.get_json()
    email = new_user_data["email"]
    password = hashlib.sha256(new_user_data ["password"].encode("utf-8") ).hexdigest() #figure out this line
    user_exist = User.query.filter_by(email = email,password=password).first()
    if user_exist is not None:
        access_token = create_access_token(identity=email)
        return jsonify(access_token = access_token)
    else:
        return jsonify("wrong email"),403






