# pair_project

=== Database ===
PairProjectP1 - nama db


=== association sequelize ===
- User hasOne Profile = One to One
- Penjelasan: Satu user cuma punya satu data profil detail.

- User hasMany Order = One to Many
- Satu user bisa punya banyak pesanan / riwayat pesanan.

- User belongsToMany Service through Order
- Service belongsToMany User through Order
- Hubungan antara User dan Service terjadi melalui tabel Order.
- Penjelasan: Banyak user bisa memesan banyak layanan. Tabel Orders mencatat siapa pesan apa.

- Category hasMany Service = One to Many
- Penjelasan: 1 satu category bisa punya bnyak layanan service

[Profile]
    | (1:1)
    |
  [User] ----------------------- < [Order] > -------------------- [Service]
                                 (Junction M:M)                       ^
                                                                      | (1:M)
                                                                      |
                                                                 [Category]