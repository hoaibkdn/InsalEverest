Rails.application.routes.draw do
  devise_for :users
  use_doorkeeper
  root "home_pages#index"

  namespace :admin do
    root "login_pages#index"
    resources :tables, only: [:index]
    resources :products, only: [:index]
  end
end
