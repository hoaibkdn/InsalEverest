Rails.application.routes.draw do
  use_doorkeeper

  root "home_pages#index"
end
