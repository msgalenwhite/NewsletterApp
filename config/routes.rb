Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :newsletters, only: [:new, :create]

  namespace :api do
    namespace :v1 do
      resources :newsletters, only: [:index]
      resources :entries, only: [:create]
    end
  end
end
