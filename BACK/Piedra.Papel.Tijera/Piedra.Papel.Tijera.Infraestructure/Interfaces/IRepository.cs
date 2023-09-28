using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Infraestructure.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);

        void AddAsync(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);

        void Delete(Guid id);

        void Delete(TEntity entityToDelete);

        void DeleteEntity(int id);

        void DeleteRange(IEnumerable<TEntity> entities);

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> expression);

        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] includeProperties);

        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "");

        IQueryable<TEntity> GetAll();

        IQueryable<TEntity> GetAll(params Expression<Func<TEntity, object>>[] includeProperties);

        Task<TEntity> GetById(int id);

        TEntity Last();

        TEntity LastOrDefault(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] includeProperties);

        void Update(TEntity entity);

        void UpdateRange(IEnumerable<TEntity> entities);

        IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> where, params Expression<Func<TEntity, object>>[] includeProperties);

    }
}
