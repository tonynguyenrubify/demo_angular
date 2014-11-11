Contacts::Application.routes.draw do

  devise_for :users

  root :to => "layouts#index"

  scope "api" do
    resources :contacts
  end

  match "*path" => "layouts#index"
end
