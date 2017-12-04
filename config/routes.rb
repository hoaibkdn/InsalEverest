Rails.application.routes.draw do
  devise_for :users
  use_doorkeeper

  root "home_pages#index"
end
