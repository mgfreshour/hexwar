module ApplicationHelper
  def resource_mtime(source)
    File.exist?(source) ? File.mtime(source).to_i : Time.now.to_i
  end
end
