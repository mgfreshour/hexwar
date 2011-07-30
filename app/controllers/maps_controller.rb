class MapsController < ApplicationController
  skip_filter :check_admin
  before_filter :check_admin, :except=>:show
  
  # GET /maps
  # GET /maps.xml
  def index
    @maps = Map.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @maps }
    end
  end

  # GET /maps/1
  # GET /maps/1.xml
  def show
    @map = Map.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @map }
      format.xml  { render :xml => @map }
      format.yaml { render :text => @map.to_yaml }
    end
  end

  # GET /maps/new
  # GET /maps/new.xml
  def new
    @map = Map.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @map }
    end
  end

  # GET /maps/1/edit
  def edit
    @map = Map.find(params[:id])
  end

  # POST /maps
  # POST /maps.xml
  def create
    save(params)
  end

  # PUT /maps/1
  # PUT /maps/1.xml
  def update
    save(params)
  end

  # DELETE /maps/1
  # DELETE /maps/1.xml
  def destroy
    @map = Map.find(params[:id])
    @map.destroy

    respond_to do |format|
      format.html { redirect_to(maps_url) }
      format.xml  { head :ok }
    end
  end
  
  private
  def save(params)
    @map = params[:id] ? Map.find(params[:id]) : Map.new(params[:map])

    respond_to do |format|
      if @map.update_attributes(params[:map])
        format.json { render :json => @map }
      else
        format.json  { render :json => @map.errors }
      end
    end
  end

end
