class Notifier < ActionMailer::Base
  default :from => "hexwar@mgfstudios.com"
  @host = HexGame::Application.config.hexwar['host']

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier.notify_turn.subject
  #
  def notify_turn (game_name, game_id, player_email, player_id)
    @game_name = game_name
    @game_id = game_id
    @player_email = player_email
    @player_id = player_id

    mail :to => player_email, :subject=>'Hexwar : It is your Turn!!'
  end
end
