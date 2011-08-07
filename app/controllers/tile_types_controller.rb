class TileTypesController < ApplicationController
  skip_filter :check_authentication
  before_filter :check_authentication, :except => [:index]
  skip_filter :check_admin
  before_filter :check_admin, :except=>:index
  
  caches_page :index, :if => Proc.new { |c| c.request.format.json? }
  
  # GET /tile_types
  # GET /tile_types.xml
  def index
    @tile_types = TileType.find(:all, :order=>:position)

    respond_to do |format|
      format.html { check_authentication } # index.html.erb
      format.json { render :json => @tile_types }
      format.xml  { render :xml => @tile_types }
    end
  end

  # GET /tile_types/1
  # GET /tile_types/1.xml
  def show
    @tile_type = TileType.find(params[:id])
    @unit_types = UnitType.find(:all, :order=>:position)

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @tile_type }
    end
  end

  # GET /tile_types/new
  # GET /tile_types/new.xml
  def new
    @tile_type = TileType.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @tile_type }
    end
  end

  # GET /tile_types/1/edit
  def edit
    @tile_type = TileType.find(params[:id])
    @unit_types = UnitType.find(:all, :order=>:position)
  end

  # POST /tile_types
  # POST /tile_types.xml
  def create
    @tile_type = TileType.new(params[:tile_type])
    
    expire_page :action=>'index', :format=>'json'

    respond_to do |format|
      if @tile_type.save
        format.html { redirect_to(@tile_type, :notice => 'Tile type was successfully created.') }
        format.xml  { render :xml => @tile_type, :status => :created, :location => @tile_type }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @tile_type.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /tile_types/1
  # PUT /tile_types/1.xml
  def update
    @tile_type = TileType.find(params[:id])
    
    expire_page :action=>'index', :format=>'json'

    respond_to do |format|
      if @tile_type.update_attributes(params[:tile_type])
        format.html { redirect_to(@tile_type, :notice => 'Tile type was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @tile_type.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /tile_types/1
  # DELETE /tile_types/1.xml
  def destroy
    @tile_type = TileType.find(params[:id])
    @tile_type.destroy
    
    expire_page :action=>'index', :format=>'json'

    respond_to do |format|
      format.html { redirect_to(tile_types_url) }
      format.xml  { head :ok }
    end
  end
end
