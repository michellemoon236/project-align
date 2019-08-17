class TasksController < ApplicationController
  before_action :require_login
  skip_before_action :verify_authenticity_token

  def create 
    task = Task.new(task_params)
    if task.save
      flash[:notice] = "*New task has been added*"
      render json: task
    end
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def edit 
    binding.pry
    @task = Task.find(params[:id])
    binding.pry
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    if @task.save
      flash[:notice] = "*Task has been updated*"
      redirect_to @task.project
    else
      flash[:error] = @task.errors.full_messages
      render :edit 
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    flash[:notice] = "*Task has been deleted*"
    redirect_to @task.project
  end

  def task_complete
    params[:task] ? @task = Task.find(params[:task][:id]) : @task = Task.find(params[:id])
    @task.status_change
    flash[:notice] = "*Task status has been changed*"
    @task.save
    redirect_to project_path(id: @task.project_id)
  end

  private

  def task_params
    params.require(:task).permit(:content, :project_id, :id)
  end

  def require_login
    return head(:forbidden) unless user_signed_in?
  end

end
