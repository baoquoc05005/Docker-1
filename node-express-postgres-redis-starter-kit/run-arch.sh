set -e
tr -d '\r' < arch.sh > /tmp/arch.sh
sed -i 's/^read projectname$/projectname=starter-app/' /tmp/arch.sh
sed -i 's/^npm init$/npm init -y/' /tmp/arch.sh
sed -i 's/^read ok$/true/' /tmp/arch.sh
bash /tmp/arch.sh