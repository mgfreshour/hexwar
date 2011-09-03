class MapsController < ApplicationController
  skip_filter :check_authentication
  before_filter :check_authentication, :except => [:show]
  skip_filter :check_admin
  before_filter :check_admin, :except=>:show
  
  caches_page :show, :if => Proc.new { |c| c.request.format.json? }
  
  #
  # GET /maps
  #
  def index
    @maps = Map.find(:all)

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  #
  # GET /maps/1
  #
  def show
    @map = Map.find(params[:id])

    respond_to do |format|
      format.html   { check_authentication } # show.html.erb
      format.json { render :json => @map }
      format.yaml { render :text => @map.to_yaml }
    end
  end

  #
  # GET /maps/new
  #
  def new
    @map = Map.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  #
  # GET /maps/1/edit
  #
  def edit
    @map = Map.find(params[:id])
  end

  #
  # POST /maps
  #
  def create
    save(params)
  end

  #
  # PUT /maps/1
  #
  def update
    save(params)
  end

  #
  # DELETE /maps/1
  #
  def destroy
    @map = Map.find(params[:id])
    @map.destroy
    
    expire_page :action=>'show', :id=>params[:id], :format=>'json'

    respond_to do |format|
      format.html { redirect_to(maps_url) }
      format.xml  { head :ok }
    end
  end
  
  private
  #
  # Saves map, both new and existing
  #
  def save(params)
    @map = params[:id] ? Map.find(params[:id]) : Map.new(params[:map])
    
    if params[:id]
      expire_page :action=>'show', :id=>params[:id], :format=>'json'
    end

    respond_to do |format|
      if @map.update_attributes(params[:map])
        format.json { render :json => @map }
      else
        format.json  { render :json => @map.errors }
      end
    end
  end

end
