class UsersController < ApplicationController

  include SessionsHelper

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
    @collections = Collection.where(user_id: @user)
  end

  def search
    @user = current_user
    @collections = Collection.where(user_id: @user)
  end
  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end


end
