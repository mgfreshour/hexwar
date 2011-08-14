class Notifier < ActionMailer::Base
  default :from => "hexwar@mgfstudios.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier.notify_turn.subject
  #
  def notify_turn (game_name, game_id, player_email, player_id, host='hexwar.mgfstudios.com')
    @game_name = game_name
    @game_id = game_id
    @player_email = player_email
    @player_id = player_id
    @host = host

    mail :to => player_email, :subject=>'Hexwar : It is your Turn on '+@game_name+'!!'
  end
end
