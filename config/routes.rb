Rails.application.routes.draw do
  devise_for :users
  use_doorkeeper
  root "home_pages#index"

  namespace :admin do
    root "login_pages#index"
    resources :tables, only: [:index]
    resources :products, only: [:index]
  end
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update]
      resources :sessions, only: [:create]
      resources :categories, only: [:create, :update, :destroy]
    end
  end
end
