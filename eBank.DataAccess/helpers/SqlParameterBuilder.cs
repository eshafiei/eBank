using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace eBank.DataAccess.helpers
{
    public class SqlParameterBuilder
    {
        readonly string _typeName;
        readonly SqlMetaData[] _columns;
        readonly List<SqlDataRecord> _rows;

        public SqlParameterBuilder(string typeName, params SqlMetaData[] columns)
        {
            _typeName = typeName;
            _columns = columns;
            _rows = new List<SqlDataRecord>();
        }

        public SqlParameterBuilder AddRow(params object[] fieldValues)
        {
            var row = new SqlDataRecord(_columns);
            row.SetValues(fieldValues);
            _rows.Add(row);
            return this;
        }

        public SqlParameter CreateParameter(string name)
        {
            return new SqlParameter
            {
                ParameterName = name,
                Value = _rows,
                TypeName = _typeName,
                SqlDbType = SqlDbType.Structured
            };
        }
    }
}
