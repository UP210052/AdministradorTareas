#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

echo "Checking MySQL at $host..."

# Ajusta esto a tu preferencia
MAX_ATTEMPTS=30
attempts=0

until mysql -h "$host" -u "${MYSQL_USER}" -p"${MYSQL_PASSWORD}" -e "SELECT 1;" 2>/dev/null; do
  attempts=$((attempts + 1))
  if [ "$attempts" -ge "$MAX_ATTEMPTS" ]; then
    >&2 echo "MySQL is still unavailable after $attempts attempts."
    exit 1
  fi
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd
