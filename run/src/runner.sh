#!/bin/bash
echo "Checking enviroments:"
echo "PRODUCT ${PRODUCT}"
echo "MANUAL ${MANUAL}"
echo "SCHEDULE ${SCHEDULE}"
echo "BUILD_NUMBER ${BUILD_NUMBER}"
echo "INPUT_PATH ${INPUT_PATH}"
echo "OUTPUT_PATH ${OUTPUT_PATH}"
echo "TEST_PATH ${TEST_PATH}"

node /app/run/runner.js --func robot --product ${PRODUCT} --manual ${MANUAL} --schedule ${SCHEDULE} --output=/app/data/${PRODUCT}/${BUILD_NUMBER} --outputdir="/app/data/${PRODUCT}/${BUILD_NUMBER}" --testpath="${TEST_PATH}"


INPUT_PATH=/app/data/${PRODUCT}/${BUILD_NUMBER}
OUTPUT_PATH=/app/data/${PRODUCT}/${BUILD_NUMBER}

docker exec "${CONTAINER_NAME}" /bin/sh -c "env \
  PRODUCT='${PRODUCT}' \
  MANUAL='${MANUAL}' \
  SCHEDULE='${SCHEDULE}' \
  BUILD_NUMBER='${BUILD_NUMBER}' \
  INPUT_PATH='${INPUT_PATH}' \
  OUTPUT_PATH='${OUTPUT_PATH}' \
  TEST_PATH='${TEST_PATH}' \
  bash /app/run/runner.sh" || true

node /app/run/runner.js --func robot --product ${PRODUCT} --manual ${MANUAL} --schedule ${SCHEDULE} --input="${INPUT_PATH}" --output="${OUTPUT_PATH}" --outputdir="${OUTPUT_PATH}" --testpath="${TEST_PATH}"
