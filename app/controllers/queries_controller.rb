require 'uri'

class QueriesController < ApplicationController

  def create
    user = User.find(@user_id)
    @query = Query.new
    @query.string = params[:q]
    user.queries << @query
    user.save
    render json: { id: @query.id, results: @query.results }, status: :created
  end

  def show
    @query = Query.find(params[:id])
    render json: { id: @query.id, results: @query.results }
  end

  def index
    user = User.find(@user_id)
    @queries = user.queries
    render json: @queries
  end
end
