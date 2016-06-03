class UsersController < ApplicationController

  include SessionsHelper

  require 'net/http'
  require 'json'

  before_action :authenticate!, only: [:profile]

  def new
    @user = User.new
  end

  def create
    @user = User.create user_params
    redirect_to log_in_path
  end

  def log_in
    @user = current_user
  end

  def profile
    @user = current_user
    @your_collections = Collection.where(user_id: @user)
    @all_collections = Collection.where.not(user_id: @user)
    @all_collections  = @all_collections.where(is_private: false)
  end

  def search
    @user = current_user
    @collections = Collection.where(user_id: @user)
  end

  def token
    api_url = URI.parse('https://api.artsy.net/api/tokens/xapp_token')
    response = Net::HTTP.post_form(api_url, client_id: ENV['client_id'], client_secret: ENV['client_secret'])
    # binding.pry
    xapp_token = JSON.parse(response.body)['token']
    render json: { token: xapp_token }
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end


end
