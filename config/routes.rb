Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :newsletters, only: [:new, :create, :show]

  namespace :api do
    namespace :v1 do
      resources :newsletters, only: [:index, :show]
      resources :entries, only: [:create]
      resources :invitations, only: [:create]
    end
  end

  get '*path' => 'homes#index'
end
