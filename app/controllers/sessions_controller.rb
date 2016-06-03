class SessionsController < ApplicationController

  # take the username and password and confirm this is a user on the site
  def create
    #get the fields from the form
    name = params[:name]
    username = params[:username]
    password = params[:password]
    user = User.find_by username: username

    #user.authenticate becuase has_secure_password was included in the model
    if user && user.authenticate( password )
      session[:user_id] = user.id
      # should redirect to servers profile page
      redirect_to profile_path
    else
      redirect_to log_in_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to log_in_path
  end

end
