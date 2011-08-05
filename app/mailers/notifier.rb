class Notifier < ActionMailer::Base
  default :from => "hexwar@mgfstudios.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier.notify_turn.subject
  #
  def notify_turn (game_player, host)
    @game = game_player.game
    @host = host
    @player = game_player.player

    mail :to => game_player.player.email, :subject=>'Hexwar : It is your Turn on '+@game.name+'!!'
  end
end
