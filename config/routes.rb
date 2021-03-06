Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :newsletters, only: [:new, :create, :show]
  resources :invitations, only: [:show]
  resources :subscriptions, only: [:new, :create]


  namespace :api do
    namespace :v1 do
      resources :newsletters, only: [:index, :show] do
        resources :entries, only: [:index]
        resources :users, only: [:index]
        resources :printed_newsletters, only: [:index]
      end
      resources :entries, only: [:create, :update]
      resources :invitations, only: [:create]
      resources :subscriptions, only: [:index, :create]
    end
  end

  get '*path' => 'homes#index'
end
