class AdminsController < ApplicationController

  include SessionsHelper

  before_action :authenticate!, only: [:profile]

  def index
    @user = current_user

  end



end
