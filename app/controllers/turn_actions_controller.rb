class TurnActionsController < ApplicationController
  skip_filter :check_admin

  # GET /turn_actions
  # GET /turn_actions.xml
  def index
    @turn_actions = TurnAction.all

    respond_to do |format|
      format.json { render :json => @turn_action }
    end
  end

  # GET /turn_actions/1
  # GET /turn_actions/1.xml
  def show
    @turn_action = TurnAction.find(params[:id])

    respond_to do |format|
      format.json { render :json => @turn_action }
    end
  end

  # GET /turn_actions/new
  # GET /turn_actions/new.xml
  # def new
  #   @turn_action = TurnAction.new
  # 
  #   respond_to do |format|
  #     format.html # new.html.erb
  #     format.xml  { render :xml => @turn_action }
  #   end
  # end

  # GET /turn_actions/1/edit
  # def edit
  #   @turn_action = TurnAction.find(params[:id])
  # end

  # POST /turn_actions
  # POST /turn_actions.xml
  def create
    @turn_action = TurnAction.new(params[:turn_action])

    respond_to do |format|
      if @turn_action.save
          format.json { render :json => @turn_action }
        else
          format.json  { render :json => @turn_action.errors }
        end
    end
  end

  # PUT /turn_actions/1
  # PUT /turn_actions/1.xml
  # def update
  #   @turn_action = TurnAction.find(params[:id])
  # 
  #   respond_to do |format|
  #     if @turn_action.update_attributes(params[:turn_action])
  #       format.html { redirect_to(@turn_action, :notice => 'Turn action was successfully updated.') }
  #       format.xml  { head :ok }
  #     else
  #       format.html { render :action => "edit" }
  #       format.xml  { render :xml => @turn_action.errors, :status => :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /turn_actions/1
  # DELETE /turn_actions/1.xml
  # def destroy
  #   @turn_action = TurnAction.find(params[:id])
  #   @turn_action.destroy
  # 
  #   respond_to do |format|
  #     format.html { redirect_to(turn_actions_url) }
  #     format.xml  { head :ok }
  #   end
  # end
end
