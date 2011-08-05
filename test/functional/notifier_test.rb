require 'test_helper'

class NotifierTest < ActionMailer::TestCase
  test "notify_turn" do
    mail = Notifier.notify_turn
    assert_equal "Notify turn", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
