class Query < ApplicationRecord
  belongs_to :user

  LCBO_TOKEN = "MDo0ZTA3YzNkMi1hZWIzLTExZTctYjAwMy0zMzYxZDNjYmQzNTQ6dFV6ZTFCM3lrenU3bWFoVmZTb0FLZ2E5WDM4dTY5WTJoWXE0"

  def results
    res = HTTP.auth("Token #{LCBO_TOKEN}")
      .get("https://lcboapi.com/products?q=#{URI.escape(self.string)}&order=price_per_liter_of_alcohol_in_cents.asc&where_not=is_dead,is_discontinued")
    r = JSON.parse(res.body)["result"]
    return r.select {|r| r["alcohol_content"] > 0}.take 10
  end
end
