Rails.application.routes.draw do
  resource :session, only: [:create]
  resources :users, only: :create
  resources :queries, only: [:show, :create, :index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
