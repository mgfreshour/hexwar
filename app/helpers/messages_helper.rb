module MessagesHelper
  def populateGameConversationJS(game)
    ret = "var messages = '';"
    game.messages.find(:all, :order => "created_at ASC", :include => [:player]).each do |msg|
    	ret += "messages += '[#{h msg.updated_at.strftime('%m/%d/%Y %H:%M %Z')}] #{h msg.player.name} : #{h(msg.text).gsub("\n", "<br />").gsub("\r",'').gsub("'", '`')}<br />';\n"
    end
    ret += "$('#conversation_entries').html(messages);"
    ret += "$('#conversation_entries').prop({ scrollTop: $('#conversation_entries').prop('scrollHeight') });";
    ret += "$('#message_text').val('');"
    
    ret.html_safe
  end
end
