class UnitTypesController < ApplicationController
  # GET /unit_types
  # GET /unit_types.xml
  def index
    @unit_types = UnitType.find(:all, :order => "position")

    respond_to do |format|
      format.html # index.html.erb
      format.html { render :json => @unit_types }
      format.xml  { render :xml => @unit_types }
    end
  end

  # GET /unit_types/1
  # GET /unit_types/1.xml
  def show
    @unit_type = UnitType.find(params[:id])
    @tile_types = TileType.find(:all, :order => :position)

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @unit_type }
    end
  end

  # GET /unit_types/new
  # GET /unit_types/new.xml
  def new
    @unit_type = UnitType.new
    @tile_types = TileType.find(:all, :order => :position)

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @unit_type }
    end
  end

  # GET /unit_types/1/edit
  def edit
    @unit_type = UnitType.find(params[:id])
    @tile_types = TileType.find(:all, :order => :position)
  end

  # POST /unit_types
  # POST /unit_types.xml
  def create
    @unit_type = UnitType.new(params[:unit_type])
    @tile_types = TileType.find(:all, :order => :position)

    respond_to do |format|
      if @unit_type.save
        format.html { redirect_to(unit_types_url, :notice => 'Unit type was successfully created.') }
        format.xml  { render :xml => @unit_type, :status => :created, :location => @unit_type }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @unit_type.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /unit_types/1
  # PUT /unit_types/1.xml
  def update
    @unit_type = UnitType.find(params[:id])
    @tile_types = TileType.find(:all, :order => :position)

    respond_to do |format|
      if @unit_type.update_attributes(params[:unit_type])
        format.html { redirect_to(unit_types_url, :notice => 'Unit type was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @unit_type.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /unit_types/1
  # DELETE /unit_types/1.xml
  def destroy
    @unit_type = UnitType.find(params[:id])
    @unit_type.destroy

    respond_to do |format|
      format.html { redirect_to(unit_types_url) }
      format.xml  { head :ok }
    end
  end
end
