composer install --no-dev --optimize-autoloader
npm install
npm run build
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
sudo systemctl restart php8.3-fpm
sudo systemctl restart nginx