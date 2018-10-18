# 
# Course/Deal images are stored in S3 in production. They are stored in a
# different bucket in staging. They are stored locally in development.
#
# We routinely use production database exports in staging and development.
# Because of this, most course/deal images don't exist.
#
# In staging this middleware replaces all instances of staging S3 urls
# with their production equiveleant.
#
# In development it does the same unless that file exists on disk locally.
#
class AmazonS3Munger
  def initialize(app)
    @app = app
  end
  
  def call(env)
    status, headers, response = @app.call(env)

    if headers['Content-Type'] =~ %r!text/html!

      body = '' 
      response.each {|e| body << e}

      case Rails.env
      when 'staging'
        body.gsub!('//supremegolf-staging.s3.amazonaws.com', '//supremegolf.s3.amazonaws.com')
      when 'development'
        body.gsub!(%r!(?:#{Rails.application.config.action_mailer.asset_host})?/system/assets/(courses|course_reviews|deals)/([\d/\w.]+)!) {|m|
          if File.exist? File.join(Rails.root, 'public', m)
            m
          else
            "https://supremegolf.s3.amazonaws.com/assets/#{$1}/#{$2}"
          end
        }
      end

      response = [body]
    end

    [status, headers, response]
  end

end
